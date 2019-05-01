# mclean-band
Archive of the code components used in the McLean High School Marching Band registration process:

<b>commitment-form.html</b>

Contents of the HTML area on the page https://mcleanband.org/marching-band-commitment-form.html. 
Includes a REST call to the Google Sheet where registrations are tracked to add a new row for the student.
Redirects to a DocuSign Powerform, pre-populating fields on the electronic document for signature.

<b>gscode.gs</b>

Script within the registrations Google Sheet (exposed an an external web servie) that adds a new row to the bottom with the supplied fields.
