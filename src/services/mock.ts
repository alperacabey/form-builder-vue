export default {
    "checklist": {
      "checklist_title": "Test task form",
      "checklist_description": " A form example for the test task",
      "form": {
        "uuid": "86d25d21-539a-4472-ac74-823c85eea236",
        "type": "form",
        "items": [
          {
            "title": "Page 1",
            "uuid": "2dd886b4-581f-43bb-addc-e79bd66ce382",
            "type": "page",
            "items": [
              {
                "uuid": "d4f0a2f5-9ff3-40fc-97e0-14d22e52d3c6",
                "title": "question 1",
                "image_id": null,
                "type": "question",
                "response_type": "list",
                "required": false,
                "params": {
                  "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                  "multiple_selection": false
                },
                "check_conditions_for": [],
                "categories": [],
                "negative": false,
                "notes_allowed": true,
                "photos_allowed": true,
                "issues_allowed": true,
                "responded": false,
                "items": []
              },
              {
                "title": "section 1",
                "uuid": "b10081c9-c953-4001-9914-e0557e193f29",
                "type": "section",
                "repeat": false,
                "weight": 1,
                "required": false,
                "items": [
                  {
                    "uuid": "4a9b3c49-7678-4743-94f3-2d246f59361e",
                    "title": "question 2",
                    "image_id": null,
                    "type": "question",
                    "response_type": "list",
                    "required": false,
                    "params": {
                      "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                      "multiple_selection": false
                    },
                    "check_conditions_for": [],
                    "categories": [],
                    "negative": false,
                    "notes_allowed": true,
                    "photos_allowed": false,
                    "issues_allowed": true,
                    "responded": false,
                    "items": []
                  },
                  {
                    "uuid": "00331d70-b55a-49ed-b033-bb969c1ab79c",
                    "title": "question 3",
                    "image_id": null,
                    "type": "question",
                    "response_type": "list",
                    "required": false,
                    "params": {
                      "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                      "multiple_selection": false
                    },
                    "check_conditions_for": [],
                    "categories": [],
                    "negative": false,
                    "notes_allowed": true,
                    "photos_allowed": true,
                    "issues_allowed": true,
                    "responded": false,
                    "items": []
                  },
                  {
                    "title": "section 2",
                    "uuid": "9a228880-5c0a-43b0-bdcd-57e748b197e0",
                    "type": "section",
                    "repeat": false,
                    "weight": 1,
                    "required": false,
                    "items": [
                      {
                        "uuid": "edc5f3e2-d039-47d7-97c7-0b13d92e6926",
                        "title": "question 4",
                        "image_id": null,
                        "type": "question",
                        "response_type": "list",
                        "required": false,
                        "params": {
                          "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                          "multiple_selection": false
                        },
                        "check_conditions_for": [],
                        "categories": [],
                        "negative": false,
                        "notes_allowed": true,
                        "photos_allowed": true,
                        "issues_allowed": true,
                        "responded": false,
                        "items": []
                      }
                    ]
                  }
                ]
              },
              {
                "uuid": "9d7f581f-1942-404e-b77e-e9f147d96ff7",
                "title": "question 5",
                "image_id": null,
                "type": "question",
                "response_type": "list",
                "required": false,
                "params": {
                  "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                  "multiple_selection": false
                },
                "check_conditions_for": [],
                "categories": [],
                "negative": false,
                "notes_allowed": true,
                "photos_allowed": true,
                "issues_allowed": false,
                "responded": false,
                "items": []
              },
              {
                "title": "section 3",
                "uuid": "b4695ada-6e05-4425-a361-1133796c165e",
                "type": "section",
                "repeat": false,
                "weight": 1,
                "required": false,
                "items": [
                  {
                    "uuid": "19b7e5de-8eda-44ba-a75c-5eadedf9921b",
                    "title": "question 6",
                    "image_id": null,
                    "type": "question",
                    "response_type": "list",
                    "required": false,
                    "params": {
                      "response_set": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
                      "multiple_selection": false
                    },
                    "check_conditions_for": [],
                    "categories": [],
                    "negative": false,
                    "notes_allowed": true,
                    "photos_allowed": true,
                    "issues_allowed": true,
                    "responded": false,
                    "items": []
                  }
                ]
              }
            ],
            "params": {
              "collapsed": false
            }
          }
        ]
      }
    },
    "params": {
      "format_version": 2,
      "response_sets": [
        {
          "uuid": "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d",
          "responses": [
            {
              "uuid": "83790c3b-b324-4f9f-83ae-50609f728926",
              "title": "Yes",
              "color": "#4AD862",
              "score": 1,
              "negative": false
            },
            {
              "uuid": "ebfd57c9-ef9c-4cab-a664-147b2b8d558d",
              "title": "No",
              "color": "#FF6E44",
              "score": 0,
              "negative": true
            },
            {
              "uuid": "c2e27675-927e-4443-8f77-84e79a4d3a6e",
              "title": "N/A",
              "color": "#777777",
              "score": null,
              "negative": false
            }
          ]
        }
      ]
    }
  }