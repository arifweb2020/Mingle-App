import React from 'react';

function Footer(props) {
    return (
        <footer className="page-footer">
            
            <div className="footer-copyright">
                <div className="container cp">
                    © 2021 Copyright Let's Mingle
                    <span className="mTop" onClick={()=>window.scroll(0,0)}>Move Top</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;