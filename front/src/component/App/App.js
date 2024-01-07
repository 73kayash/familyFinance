import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Calendar} from "../Calendar/Calendar";

function App() {
    return (
        <div className={"text-bg-dark bg-dark min-vh-100 container"}>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Calendar/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
