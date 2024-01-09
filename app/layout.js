import "./globals.css";

export const metadata = {
    title: "Fusion",
    description: "Fuse mind and AI for better communication.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
