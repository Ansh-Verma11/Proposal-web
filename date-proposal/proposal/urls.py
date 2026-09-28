from django.urls import path

from . import views


urlpatterns = [

    path("", views.home, name="home"),

    path("start-proposal/",
         views.start_proposal,
         name="start_proposal"),

    path("date/",
         views.date_page,
         name="date_page"),

    path("select-date/",
         views.select_date,
         name="select_date"),

    path("thank-you/",
         views.thank_you,
         name="thank_you"),

    path(
    "save-date-type/",
    views.save_date_type,
    name="save_date_type"
),

path(
    "save-selection/",
    views.save_selection,
    name="save_selection"
),

]