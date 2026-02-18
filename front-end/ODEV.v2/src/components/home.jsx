import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
        <div id='front'> 
            <div className="home-text">
            <h2>LOOK YOUR BEST SELF</h2>
            <h4>WITH OUR SELECTION OF BEST TRENDS</h4>
            <Link to="/products"><button id='front-button'>Your Best Self</button></Link>
            </div>
        </div>
        </>
    )
}