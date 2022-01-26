SELECT
  C1.ContactName AS `Nome`,
  C1.Country AS `País`,
  (
    SELECT
      COUNT(C2.Country) -1
    FROM
      w3schools.customers AS C2
    WHERE
      C2.country = C1.Country
  ) AS `Número de compatriotas`
FROM
  w3schools.customers AS C1
WHERE
  (
    SELECT
      COUNT(C2.Country) -1
    FROM
      w3schools.customers AS C2
    WHERE
      C2.country = C1.Country
  ) > 0
ORDER BY
  `Nome`;
