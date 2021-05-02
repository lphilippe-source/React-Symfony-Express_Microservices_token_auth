// many grades to one student
module.exports = (sequelizeConnect, Sequelize) => {

    const Grades = sequelizeConnect.define("grade", {

        grades: Sequelize.INTEGER
    })
    Grades.associate = function(model){
        Grades.belongsTo(model.student)
    }
return Grades;
}