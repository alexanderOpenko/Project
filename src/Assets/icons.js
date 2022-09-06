function icons(icon) {
    switch (icon) {
        case 'burger-menu':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 50 50" width="50px"><path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"/></svg>
        case 'trash':
            return '<svg viewBox="0 0 20 20" class="trashIcon" focusable="false" aria-hidden="true"> <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path> </svg>'
        case 'cart':
            return <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z" fill="#ffffff"/>
            </svg>
        case 'close':
            return <svg role="presentation" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M2.5 2.5871L21.5 21.5871" stroke="black"></path><path d="M21.5 2.5871L2.5 21.5871" stroke="black"></path></svg>
        case 'warning':
            return <svg role="presentation" version="1.1" width="13" height="13" viewBox="0 0 13 13"><g><circle cx="6.5" cy="6.5" r="6" fill="#FF4B41"></circle><path d="M6.000,3.000 L7.000,3.000 L7.000,8.000 L6.000,8.000 L6.000,3.000 z" fill="#FFFFFF"></path><path d="M6.000,9.000 L7.000,9.000 L7.000,10.000 L6.000,10.000 L6.000,9.000 z" fill="#FFFFFF"></path></g></svg>
    }
}

export default icons
