module.exports = (sequelizeConnect, Sequelize) => {

    const Student = sequelizeConnect.define("student", {

        id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        lastname: {
        type: Sequelize.STRING
        },
        firstname: {
        type: Sequelize.STRING
        },
        email: {
        type: Sequelize.STRING
        },
        age: {
        type: Sequelize.INTEGER
        }
    })
        Student.associate= function(model){
            Student.hasMany(model.grades)
        }
return Student;

};