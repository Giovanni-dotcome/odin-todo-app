import { sidebar, content, overlay } from "../ui/htmlElements"

export default function hideSidebar() {
  sidebar.style.right = '-350px'; // Hide sidebar
  content.classList.remove('blur'); // Remove blur from content
  overlay.classList.remove('visible'); // Hide overlay
}


