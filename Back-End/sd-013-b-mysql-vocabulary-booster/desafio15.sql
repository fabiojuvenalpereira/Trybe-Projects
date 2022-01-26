DELIMITER $$ 
CREATE PROCEDURE buscar_media_por_cargo(IN nomeProf VARCHAR(50))
BEGIN
SELECT
  ROUND(AVG(E.SALARY), 2) AS 'Média salarial'
FROM
  hr.employees AS E
    JOIN
  hr.jobs AS J ON E.JOB_ID = J.JOB_ID
    WHERE  J.JOB_TITLE = nomeProf;
END $$
DELIMITER;
