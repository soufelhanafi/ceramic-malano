<!DOCTYPE html>
<html lang="fr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport</title>
    <#setting number_format=",##0.00">
    <#setting date_format="dd/MM/yyyy">

    <#setting locale="fr_FR">
    <style>

        body {
            font-family: sans-serif;
        }

        h1, h2, table, .figure {
            width: 80%;
            margin: 20px auto;
        }

        .number {
            text-align: right;
        }

        tr.total {
            font-weight: bolder;
        }

        .revenus tr, .depenses tr {
            background-color: #ececec;
        }

        tr.title {
            background-color: white;
        }

        .revenus td, .depenses td {
            padding: 5px;
            border: 1px solid white;
        }

        .mesure, .mandataire {
            background-color: #ececec;
            padding: 5px;
        }

        .mesure td, .mandataire td {
            vertical-align: top;
        }

        .situation .number {
            border: 1px solid black;
        }

        .situation td {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
        }

        .situation {
            border: 1px solid black;
        }

        table {
            border-collapse: collapse;
        }

        .figure img {
            width: 100%;
        }


    </style>
</head>
<body>
    <h1>${str}</h1>
</body>
</html>