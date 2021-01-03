My version of the React Wagtail course from https://www.accordbox.com/blog/react-wagtail-course/

# Getting Started

1. Install Docker (including docker-compose)
2. Clone this repository
3. Copy `.env/.dev-sample.example` to `.env/.dev-sample` and change the SQL_PASSWORD and SECRET_KEY
4. Run `docker-compose build`
5. Run `docker-compose up`. If everything starts up successfully, you
will probably want to Crtl-c to exit and then start the containers in
the background with `docker-compose up -d`; then you can view the logs
using `docker-compose logs -f`

This should give you 4 containers:

1. **rw-db** - the PostgresDatabase (with a persistant volume named
   `react_wagtail_postgres_data` for the data and available inside the
   cluster's private network on port 5432.

2. **rw-web** - the Django/Wagtail application. This will be available in
   your browser as `http://localhost:8000`. It also has a persistant
   volume for the media directory: `react_wagtail_media`. The Wagtail admin
   can be found at `http://localhost:8000/admin/` and the Django admin at
   `http://localhost:8000/django-admin/`. You will need to create a superuser
   to access either of those. Inside rw-web, run `./manage.py createsuperuser`

3. **rw-frontend** - the NodeJS container that builds the ReactApp for
   you when you change files. This will be available in your browser
   as `http://localhost:3000`. It also has a persistant volume that is
   shares with the storybook container for the node_modules:
   `react_wagtail_node_modules`

4. **rw-storybook** - the container that runs our StoryBook site -
   available in your browser as `http://localhost:6006`. This is
   probably the most interesting part - at least until I get all the
   peices working together.


## Possible Improvements

1. I would really like the StoryBook documentation to be a bit more
descriptive. Because we are consuming the StreamField JSON without
doing any processing first, all the real data is in `props.value`, so
the docs are only showing that one input parament. Refactor my
components so they take named arguments and then do the unpacking of
`props.value` before calling each of them. I will probably do most of
this in the giant if block in `StreamField.js`


## Errata

* Section 16.5 in the code for `frontend/src/components/PostPage.js`, define
PostDetail as `<PostDetail {...this.props} />` so that section 17.4 works
before you move to section 17.5 (where the PostPage is updated to pass props).

* A couple of the story examples in chapter 17 have `mockPost();` and omit
setting up the axios mock. You still need the following setup when you need
to mock data returned from an AJAX call:

```javascript
const mock = new MockAdapter(axios);
mockPost(mock);
mockTag(mock);
```

* All the Storybook code (and mocks) is built assuming the APIs return the data
inside a JSON object with the main key being 'results'. However, the actual API
I created served the tags, categories, and posts as bare lists. Updated viewsets
to match the structure my React code was expecting.


## Study Questions

1. Which components are defined as React.Components and which as pure functions? Why?