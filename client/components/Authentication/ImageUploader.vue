<template>
    hi
</template>

<!-- <script >
export default {
  data() {
    return {
      imgSrc: 'https://i.imgur.com/U7afLiO.png', // Default image source
      imgUrl: '', // Will hold the URL after upload
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 52946cc1bf7630c6e24ebb5729346d4b5a225370', // Be sure to replace "YOUR_CLIENT_ID" with your actual Client ID from Imgur
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.imgSrc = data.data.link; // This will update the image source
          this.imgUrl = data.data.link; // This will update the URL text
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>


<template>
    <div>
      <img :src="imgSrc" alt="Your Image" height="200px">
      <br />
      <input type="file" @change="handleFileChange">
      <br />
      <strong>
        <p>{{ imgUrl }}</p>
      </strong>
    </div>
  </template>
  
 
  <style>
  /* You can add styles here if you want */
  </style>
   -->