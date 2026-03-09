const fs = require('fs');
const path = require('path');
const axios = require('axios');

const imgDir = path.join(__dirname, 'public', 'img');

async function seed() {
  try {
    const files = fs.readdirSync(imgDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const title = path.basename(file, path.extname(file));
        const payload = {
          title: title,
          description: title + ' - Graphic Design',
          category: 'Graphics',
          mediaUrl: '/img/' + file
        };

        try {
          const res = await axios.post('http://localhost:3000/api/projects', payload);
          if (res.data.success) {
            console.log(`Successfully added: ${file}`);
          } else {
            console.error(`Failed to add ${file}:`, res.data);
          }
        } catch (postError) {
          console.error(`Request failed for ${file}:`, postError.response ? postError.response.data : postError.message);
        }
      }
    }
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed();
