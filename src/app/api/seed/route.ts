
import { NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';

// Import mock data directly from service files
import { getMockProcedures } from '@/services/proceduresService';
import { getMockPromotions } from '@/services/promotionsService';
import { mockStaff } from '@/services/staffService';
import { mockClients } from '@/services/usersService';

export async function GET() {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ message: 'Firebase not configured. Seeding aborted.' }, { status: 500 });
    }

    try {
        const batch = writeBatch(db);
        let count = 0;

        // 1. Seed Procedures
        console.log('Seeding procedures...');
        const procedures = getMockProcedures();
        const proceduresCol = collection(db, 'procedures');
        procedures.forEach(item => {
            const docRef = doc(proceduresCol, item.id);
            // Firestore doesn't like undefined values
            const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));
            batch.set(docRef, cleanItem);
            count++;
        });

        // 2. Seed Promotions
        console.log('Seeding promotions...');
        const promotions = getMockPromotions();
        const promotionsCol = collection(db, 'promotions');
        promotions.forEach(item => {
            const docRef = doc(promotionsCol, item.id);
            const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));
            batch.set(docRef, cleanItem);
            count++;
        });

        // 3. Seed Staff
        console.log('Seeding staff...');
        const staffCol = collection(db, 'staff');
        mockStaff.forEach(item => {
            const docRef = doc(staffCol, item.id);
            const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));
            batch.set(docRef, cleanItem);
            count++;
        });
        
        // 4. Seed Clients (Users)
        console.log('Seeding clients (users)...');
        const usersCol = collection(db, 'users');
        mockClients.forEach(item => {
            const docRef = doc(usersCol, item.id);
            const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));
            batch.set(docRef, cleanItem);
            count++;
        });

        await batch.commit();

        console.log(`Database seeded successfully with ${count} documents.`);
        return NextResponse.json({ message: `Database seeded successfully with ${count} documents.` });

    } catch (error: any) {
        console.error('Error seeding database:', error);
        return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
    }
}
