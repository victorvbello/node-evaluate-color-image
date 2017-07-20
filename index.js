'use strict'

const app=require('./app');
const config=require('./config');
const getPixels = require("get-pixels");
const fs = require('fs');

const testFolder = './public/img/';	
 
app.listen(config.port,()=>{
	console.log(`API REST http://localhost:${config.port}`);	

	fs.readdir(testFolder, (err, files) => {
	  files.forEach(file => {
	    getPixels(testFolder+file, function(err, pixels) {
			  if(err) {
			    console.log("Error al evaluar image "+file,err);
			    return
			  }

			  let pointWhite = 0;
			  let range=100;
				for (let y = 0; y < pixels.shape[0]; y++){
				  for (let x = 0; x < pixels.shape[1]; x++){
				    let R=pixels.get(x, y, 0),G=pixels.get(x, y, 1),B=pixels.get(x, y, 2);
				    if( typeof R!=='undefined' && typeof G!=='undefined' && typeof B !=='undefined'){
					  	if((255-R)<=range && (255-G)<=range && (255-B)<=range){
					  		pointWhite++;
					  	}
				    }
				  }
				}
				let totalPixel=pixels.size/4;
				console.log(`File ${file} => totalPoint ${totalPixel} | whitePoint ${pointWhite} | % off White ${Math.ceil(((pointWhite*100)/totalPixel))}%`);
			})
	  });
	})

	
})

