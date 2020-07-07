const fs = require('fs');


const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');
// There is duplex stream too which means we can read and write through it
// readStream.on('data', (chunk) => {
//   console.log('------NEW CHUNK-------');
//   console.log(chunk);
//   writeStream.write('\nNEW CHUNK\n')
//   writeStream.write(chunk);
// })    

//pipings
readStream.pipe(writeStream)