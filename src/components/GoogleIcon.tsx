import type { ComponentProps } from "react";

export default function GoogleIcon(props: ComponentProps<'svg'>) {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <title>Google</title>
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-5.067 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.347-2.347C18.667.533 15.867 0 12.48 0 5.867 0 .333 5.393.333 12.16s5.534 12.16 12.147 12.16c3.267 0 5.467-1.107 7.253-2.933 1.947-1.947 2.827-4.667 2.827-7.667 0-.667-.053-1.333-.16-2z" />
        </svg>
    );
}
