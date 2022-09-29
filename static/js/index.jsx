

function Login(){
    return(
    <div className="hero">
      {/* <video autoplay loop muted plays-inline className="back-video">
        <source src="../assests/video.mp4" type="video/mp4"></source>
      </video> */}

      <h1>My Travelogue</h1>
    <h2>Login</h2>
    <form action="/login" method="POST" className="login">
    <p>
      Email <input type="text" className="email"/>
    </p>
    <p>
      Password <input type="password" className="password"/>
   </p>
  
   <p>
     <input type="submit"/>
  </p>

    </form>
    <h3><a href="/users">Create a new account</a></h3>
</div>
    )

}








ReactDOM.render(<Login />, document.getElementById('container'))