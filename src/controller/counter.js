
const http = require("http");

exports.getCount=async(bookId)=>{
    const url= process.env.COUNTER_URL+"/counter/"  + bookId;
    const response = await fetch(url);
    return response.json();
}


    exports.setCounter=(bookId) => {
        const url = process.env.COUNTER_URL+"/counter/"  + bookId+"/incr";
        const options = {
            method: 'POST',
        };
        fetch(url, options)
            .then()
            .catch(error => {
                console.error('Error:', error);
            });
    }