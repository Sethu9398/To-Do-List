import './home.css'
function Home() {
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center flex-column">
               <h1 className='text-center'>Organize Your<br/>Work and Life ,finally</h1>
               <p>Become Focus ,organized and calm with <br /> ToDo App.The World No 1 Task Manager App</p>
               <button className='home-btn p-2'>Make ToDo List</button>
            </div>
        </div>
    );
}

export default Home;