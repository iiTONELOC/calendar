module.exports = {
    // format_date: date => {
    //     return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    //         date
    //     ).getFullYear()}`;
    // },
    // format_plural: (word, amount) => {
    //     if (amount !== 1) {
    //         return `${word}s`;
    //     }

    //     return word;
    // },

    render_mini_1: data => {
      
        const dates = data.map(el=>{
            if(el===0){
                el="";
            }
            return (`<div id="mini-col" class="col">${el}</div>`)
        }).join(" ")
        return dates
    }
    
}

