import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full py-2 flex justify-center items-center bg-white shadow-inner">
            <p className="text-sm text-center w-full">Voir le projet sur <a href="https://github.com/filkat34/lisicalc-react"><FontAwesomeIcon icon={faGithub} /></a></p>
        </footer>
    )
}