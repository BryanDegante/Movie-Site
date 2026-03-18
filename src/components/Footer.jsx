import React from "react"

const Footer = (props) => {
  return (
		<footer>
			<div className="footer__container">
				<div className="row footer__row">
					<figure>
						<img
							className="footer__logo--img"
							src="/ClearLogo.png"
							alt=""
						/>
					</figure>
					<div className="footer__copyright">
						Copyright © 2025 Bryan Degante
					</div>
				</div>
			</div>
		</footer>
  );
};

export default Footer;
