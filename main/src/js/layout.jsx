import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/functional/scroll_to_top.jsx";

import { NavBar } from "./components/navbar.jsx";
import { Home } from "./pages/home.jsx";
import { ServantExperience } from "./pages/servant_exp.jsx";
import { CraftEssenceExperience } from "./pages/ce_exp.jsx";
import { DamageCalc } from "./pages/damage.jsx";
//import Store from "./store/appContext.jsx";

export class Layout extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<ScrollToTop>
					<NavBar show="inline-block" />
					<Switch>
						<Route exact path="/" component={ Home } />
						<Route exact path="/level/" component={ ServantExperience } />
                        <Route exact path="/ce/" component={ CraftEssenceExperience } />
						<Route exact path="/damage/" component={ DamageCalc } />
						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
					{/* <Footer /> */}
				</ScrollToTop>
			</BrowserRouter>
		);
	}
}

export default Layout;