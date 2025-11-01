var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Student2 = /** @class */ (function () {
    function Student2(code, name, age) {
        if (age === void 0) { age = 25; }
        this.studCode = code;
        this.studName = name;
        this.studAge = age;
    }
    return Student2;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person(code, name, department) {
        var _this = _super.call(this, code, name) || this;
        _this.department = department;
        return _this;
    }
    Person.prototype.getElevatorPitch = function () {
        return ("My unique code: ".concat(this.studCode, ", my name: ").concat(this.studName, " and I am in ").concat(this.department, "  Branch."));
    };
    return Person;
}(Student2));
var joeRoot = new Person(1, "Ion", "PS");
console.log(joeRoot.getElevatorPitch());
