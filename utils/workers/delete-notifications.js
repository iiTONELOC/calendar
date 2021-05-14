const Reminders = require('../../models/Reminders');
class Delete {

    static expiredNotifications(obj) {
        console.log("Deleting these events now")
        console.log(obj)
        // grab all event ids and then bulk delete
        const ids = obj.map(el => { return `${el.id}` })

        function getId(arr) {
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                return `${element},`;
            }
        };

        Reminders.destroy({
            where:{
                id: [getId(ids)]
            }
        }).then(response=>{
            console.log(response)
        }).catch(e=>{
            console.log(e)
        })
    }
}

module.exports = Delete