const arr = [
  "MAC-250601 VS", //0
  "MAC-250602 SG", //1
  "MAC-250603 AKR", //2
  "MAC-250603-A AKR", //3
  "MAC-250603-B AKR", //4
  "MAC-100000 DKJ", //5
  "NEC (RM-102)", //6
  "OC-1", //7
  "OC-2", //8
  "OC-3", //9
];
const data = {
  timeDay: ["Mon", "Tue", "Wed", "Thru", "Fri"],
  Ten: [arr[1], "", "", arr[1], arr[1]],
  Eleven: [arr[0], arr[0], arr[2], arr[1], arr[2]],
  Twelve: [arr[7], arr[8], arr[9], arr[2], arr[5]],
  One: ["L", "U", "N", "C", "H"],
  Two: [arr[1], arr[3], arr[0], arr[4], ""],
  Three: [arr[1], arr[3], arr[1], arr[4], arr[6]],
  Four: [arr[1], "", "", arr[6], arr[6]],
  Five: ["", "", "", arr[6], arr[6]],
};

export default data;
