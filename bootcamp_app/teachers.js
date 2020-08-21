const { Pool } = require("pg");

console.log("\n***Start of my Code ***");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(`
  SELECT DISTINCT teachers.name AS name, cohorts.name AS cohort
  FROM cohorts
    JOIN students ON cohort_id = cohorts.id
    JOIN assistance_requests ON student_id = students.id
    JOIN teachers ON teacher_id = teachers.id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
  ORDER BY name;
  `)
  .then(res => {
    res.rows.forEach (info => {
      console.log(`${info.cohort}: ${info.name}`);
    })
  })
  .catch(err => console.log("query error:", err.stack));
  
  
console.log("***End of my Code ***\n");
