

api documentaion 
do this for all api endpoints 

body 
{
    "PASSWORD": "pasword entered initialy"
}

get all data 
POST https://le-crown-interiors-backend.onrender.com/image/all

body 
{
    "PASSWORD": "pasword entered initialy"
}
setHeader('Content-Type', 'application/json');
response 
{
    "offers": [
        {
            "img": {
                "public_id": "lecrowninteriors/hsrtfdyvbtp6lvkptsux",
                "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063750/lecrowninteriors/hsrtfdyvbtp6lvkptsux.avif",
                "dimentions": {
                    "width": 369,
                    "height": 553
                }
            },
            "name": "z",
            "title": "z",
            "content": "z",
            "description": "z"
        },
        {
            "img": {
                "public_id": "lecrowninteriors/zelf1fjtfx9greltub3y",
                "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063707/lecrowninteriors/zelf1fjtfx9greltub3y.avif",
                "dimentions": {
                    "width": 930,
                    "height": 1316
                }
            },
            "name": "0jWYCPCRHpLQvXGSrNdyUab0jWYCPCRHprc7O5w",
            "title": "0jWYCPCRHpLQvXGSrNdyUab0jWYCPCRHprc7O5w",
            "content": "0jWYCPCRHpLQvXGSrNdyUab0jWYCPCRHprc7O5w",
            "description": "0jWYCPCRHpLQvXGSrNdyUab0jWYCPCRHprc7O5w"
        },
        {
            "img": {
                "public_id": "lecrowninteriors/x2dwiec2g48ugg0sdmmm",
                "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746041229/lecrowninteriors/x2dwiec2g48ugg0sdmmm.avif",
                "dimentions": {
                    "width": 4480,
                    "height": 2520
                }
            },
            "name": "markethealers",
            "title": "markethealers",
            "content": "markethealers",
            "description": "markethealers"
        }
    ],
    "hero": [
        {
            "img": {
                "public_id": "lecrowninteriors/jfqzmfj9xkb2wuoke3zy",
                "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062516/lecrowninteriors/jfqzmfj9xkb2wuoke3zy.avif",
                "dimentions": {
                    "width": 1799,
                    "height": 1200
                }
            },
            "name": "Nithya Ganesh",
            "title": "Nithya Ganesh",
            "content": "Nithya Ganesh",
            "description": "Nithya Ganesh"
        },
        {
            "img": {
                "public_id": "lecrowninteriors/iu5nczfvfhecjqytzmhn",
                "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062475/lecrowninteriors/iu5nczfvfhecjqytzmhn.avif",
                "dimentions": {
                    "width": 1920,
                    "height": 1102
                }
            },
            "name": "Nithya Ganesh",
            "title": "Nithya Ganesh",
            "content": "Nithya Ganesh",
            "description": "Nithya Ganesh"
        }
    ]
}


Request URL: https://le-crown-interiors-backend.onrender.com/image/upload
Request Method: POST

body 
{
    "PASSWORD": "pasword entered initialy"
  "name": "name string",
  "title": "title srting",
  "content": "constent strig",
  "description": "discription string",
  "folderName": "offers any one must from the list",
  "img": "(binary image file must be sent here as multipart/form-data in this name)"
}

response 
ok or error 



Request URL: https://le-crown-interiors-backend.onrender.com/image/delete
Request Method: DELETE
body
{
    "PASSWORD": "pasword entered initialy",
  "public_id": "lecrowninteriors/x2dwiec2g48ugg0sdmmm"
}
response ok or error