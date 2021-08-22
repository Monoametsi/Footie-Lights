<h1> Footie-Lights </h1>
<p> Welcome to Footie-Lights, an application that provides a platform for you to watch football match highlights from a variety of leagues.
The application was created with technologies that included HTML, CSS, JavaScript, NodeJS, Express, and MongoDB.</p>
<p> The application fetches data from a third-party API called Scorebat, which provides data that consists of football match highlights and other data regarding those matches.
After fetching the data, the application then persists the data to the database. The application then gets the data from the database and displays it
on the browser. </p>

<h2>Running the Application with Docker: </h2>

<ol>
	<li>Install Docker for windows or Docker for Mac.</li>
	<li>If you're using windows 7 install Docker Toolbox: https://github.com/docker/toolbox/releases</li>
	<li>Open a command prompt. </li>
	<li>Run <code>docker build -t footie-lights .</code> to build images.</li>
	<li>Run the <code>docker run -it -p 4500:4500 footie-lights</code> to run the container. </li>
	<li>Navigate to http://localhost:4500.</li>
	<li>Use http://192.168.99.100:4500 if you're using Docker Toolbox. This assumes that's the IP assigned to VirtualBox - change if needed.</li>
</ol>

<h2>Running the Application Locally: </h2>

<ol>
	<li>Install Node.js(http://nodejs.org).</li>
	<li>Run <code>npm install</code> to install app dependencies.</li>
	<li>Run <code>npm start</code> to start the server.</li>
	<li>Navigate to http://localhost:4500 in your browser.</li>
</ol>