export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full py-2 flex justify-center items-center bg-white shadow-inner">
            <p className="text-sm text-center w-full">&copy; {new Date().getFullYear()} Lisicalc. All rights reserved.</p>
        </footer>
    )
}