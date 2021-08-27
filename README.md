<h1> Footie-Lights </h1>
<p> Welcome to Footie-Lights, an application that provides a platform for you to watch football match highlights from a variety of leagues.
The application was created with technologies that included HTML, CSS, JavaScript, NodeJS, Express, and MongoDB.</p>
<p> The application fetches data from a third-party API called Scorebat, which provides data that consists of football match highlights and other data regarding those matches.
After fetching the data, the application then persists the data to the database. The application then gets the data from the database and displays it
on the browser. </p>

<h2>Running the Application with Docker: </h2>

<ol>
	<li>Install Node.js(http://nodejs.org) and Docker for windows or Docker for Mac.</li><br>
	<li>If you're using windows 7 install Docker Toolbox: <a href="https://github.com/docker/toolbox/releases">https://github.com/docker/toolbox/releases</a>.</li><br>
	<li>Open a command prompt. </li><br>
	<li>Run <code>docker build -t footie-lights .</code> to build images.</li><br>
	<li>Run the <code>docker run -it -p 4500:4500 footie-lights</code> to run the container. </li><br>
	<li>Navigate to <a href="http://localhost:4500">http://localhost:4500</a> in your browser.</li><br>
	<li>Use http://192.168.99.100:4500 if you're using Docker Toolbox. This assumes that's the IP assigned to VirtualBox - change if needed.</li>
</ol>

<h2>Running the Application Locally: </h2>

<ol>
	<li>Install Node.js(http://nodejs.org).</li><br>
	<li>Run <code>npm install</code> to install app dependencies.</li><br>
	<li>Run <code>npm start</code> to start the server.</li><br>
	<li>Navigate to <a href="http://localhost:4500">http://localhost:4500</a> in your browser.</li>
</ol>

<h2>Running application on heroku: </h2>
<ul>
	<li>Run the application on heroku's webhost by navigating to https://limitless-garden-71595.herokuapp.com/.</li>
</ul>


<h2>Running unit tests Locally: </h2>

<ol>
	<li>Install Node.js(http://nodejs.org).</li><br>
	<li>Run <code>npm install</code> to install app dependencies.</li><br>
	<li>Run <code>npm run test</code> to run unit tests.</li><br>
</ol>

<h2>Running unit tests with Docker: </h2>

<ol>
	<li>Install Node.js(http://nodejs.org) and Docker for windows or Docker for Mac.</li><br>
	<li>If you're using windows 7 install Docker Toolbox: <a href="https://github.com/docker/toolbox/releases">https://github.com/docker/toolbox/releases</a>.</li><br>
	<li>Open a command prompt. </li><br>
	<li>Run <code>docker build -t footie-lights-test -f DockerFile-test .</code> to build images.</li><br>
	<li>Run the <code>docker run --rm footie-lights-test</code> to run the container. </li><br>
</ol>