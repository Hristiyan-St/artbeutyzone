
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export function CallButton() {
    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <Button asChild size="icon" className="w-14 h-14 rounded-full shadow-lg">
                <a href={`tel:+359877701929`}>
                    <Phone className="h-6 w-6" />
                    <span className="sr-only">Обадете ни се</span>
                </a>
            </Button>
      </motion.div>
    );
}
