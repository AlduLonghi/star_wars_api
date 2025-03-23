"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
class User {
    id;
    name;
    email;
    password;
    role;
}
exports.User = User;
//# sourceMappingURL=user.js.map