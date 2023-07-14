"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GetRegisterMail(link) {
    return (`<div style="background-color: #171A21;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    font-size: 20px;
    border-radius: 15px;
    padding: 50px 0px;
    margin: 0px auto;">
  
  <p style="text-align: center;
    font-weight: 400;
    margin-bottom: 50px;
    color: white;"
  >Thanks you for Registering on talker</p>
  
  <a href="${link}"
  style="background-color: Teal;
    text-decoration: none;
    color: white;
    font-weight: 500;
    padding: 10px;
    border-radius: 10px;"
  >Confirm Register</a>

</div>`);
}
;
exports.default = GetRegisterMail;
//# sourceMappingURL=registerMail.js.map