var Student = /** @class */ (function () {
    function Student(code, name) {
        this.studName = name;
        this.studCode = code;
    }
    Student.prototype.getGrade = function () {
        return "10";
    };
    //creating method or function   
    Student.prototype.display = function () {
        console.log("Student studCode is: " + this.studCode);
        console.log("Student name is: " + this.studName);
    };
    return Student;
}());
