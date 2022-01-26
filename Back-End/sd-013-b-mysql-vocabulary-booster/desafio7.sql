SELECT
  CONCAT(UCASE(E.FIRST_NAME), ' ', UCASE(E.LAST_NAME)) AS `Nome completo`,
  JH.START_DATE AS `Data de início`,
  E.SALARY AS `Salário`
FROM
  hr.job_history AS JH
  INNER JOIN hr.employees AS E ON JH.EMPLOYEE_ID = E.EMPLOYEE_ID
WHERE
  MONTH(JH.START_DATE) BETWEEN 01 AND 03
ORDER BY
  `Nome completo`,
  `Data de início`;
