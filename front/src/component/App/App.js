import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "../Header/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Calendar} from "../Calendar/Calendar";
import {EventFormPage} from "../EventForm/EventFormPage";

function App() {
    return (
        <div className={"text-bg-dark bg-dark min-vh-100 container"} style={{borderRadius: '15px'}}>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Calendar/>}/>
                    <Route path="/createEvent" element={<EventFormPage />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
