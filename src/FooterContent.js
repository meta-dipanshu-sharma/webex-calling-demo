import logo from './logo.svg';

function FooterContent() {
    return (
        <footer class="container py-5">
            <div class="row">
                <a class="py-2" href="#" aria-label="Product">
                    <img src={logo} alt='logo'></img>
                </a>
            </div>
        </footer>
    );
}

export default FooterContent;
