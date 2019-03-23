const express = require('express');
const request = require('request');
const sharp = require('sharp');
const app = express();

// This route handles image processing.
app.get('/image', (req, res) => {
    res.set('content-type', 'image/jpeg');

    // Sharp can accept a filename, stream, or a buffer.
    const pipeline = sharp()
        // Multiple operations can be called on the image, like resize, rotate, negate, blur, and flip.
        .rotate(Number(req.query.rotate))
        .flip((typeof(req.query.flip) !== 'undefined'))
        // And the result image can be written to a file or a stream.
       
    // An image of Charles V is grabbed from Wikimedia Commons before being processed.
    request("https://upload.wikimedia.org/wikipedia/commons/4/41/Barend_van_Orley_-_Portrait_of_Charles_V_-_Google_Art_Project.jpg")
        .pipe(pipeline)
        .pipe(res);
});

// Quick-and-dirty web app to control the image processing.
app.get('/', (req, res) => {
    res.set('content-type', 'text/html');
    res.send(`
        <html>
            <body>
                <div> 
                    <div>
                        <div>
                            Rotate by: <input type="number" id="rotate" max="360" min="0" value="70" /> 
                        </div>
                        <div>
                            Flip photo <input type="checkbox" id="flip"/> 
                        </div>
                        <button onclick="update() ">Change</button>
                    </div>
                    <br/>
                    <img style="max-width: 320px;" src="/image?rotate=70"></img>
                </div>
                <script type="text/javascript">
                    function update() {
                        const img = document.querySelector('img');
                        
                        const rotate = document.querySelector('#rotate').value; 
                        const checked = document.querySelector('#flip').checked;

                        img.setAttribute('src', '/image?rotate=' + rotate + (checked ? '&flip' : ''));
                    }
                </script>
            </body>
        </html>
    `);
});

app.listen(Number(process.env.PORT) || 3000);