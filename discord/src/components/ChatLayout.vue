  
  <script>
  
  export default {
    name: 'MessageDiscussion',
    props: {
      message: String,
    },
    data() {
      return {
        groupName: 'Group Name',
        groupDescription: 'Group Description',
        messages: [
          {
            id: 1,
            author: 'John Doe',
            content: this.message,
          },
          {
            id: 2,
            author: 'Jane Smith',
            content: 'Hi John!',
          },
        ],
        newMessage: '',
      };
    },
    methods: {
      sendMessage() {
        const newId = this.messages.length + 1;
        const newAuthor = 'Current User'; // Replace with actual user name
        const newContent = this.newMessage;
        const newMessage = { id: newId, author: newAuthor, content: newContent };
        this.messages.push(newMessage);
        this.newMessage = '';
      },
    },
  };
  </script>
  

<template>
    
  </template>

  <style scoped>
  p {
    color: black;
  }
  .message-discussion {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .message-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #eee;
  }
  
  .message-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: scroll;
  }
  
  .message {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  .message-author {
    font-weight: bold;
    margin-bottom: 5px;
    
  }
  
  .message-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #eee;
  }
  
  .message-form input {
    flex: 1;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .message-form button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #0084ff;
    color: black;
    cursor: pointer;
  }
  </style>
  