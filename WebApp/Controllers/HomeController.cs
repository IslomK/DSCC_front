using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebApp.Utilites;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
       
        private void SendMail(string email)
        {
            //Configuring message object
            var message = new MailMessage();
            message.To.Add(new MailAddress(email));  
            message.From = new MailAddress("00005914.wiut@gmail.com");  
            message.Subject = "Registration";
            message.Body = string.Format("Welcome to the Product store website");
            message.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                //configuring SMTP client
                try
                {
                    var credential = new NetworkCredential
                    {
                        //setting credentials
                        UserName = "00005914.wiut@gmail.com",  
                        Password = "AA8902113"  
                    };
                    smtp.Credentials = credential;
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    //sending the message
                    smtp.Send(message);

                }
                catch (Exception ex)
                {
                    //if any errors occure it logs to the error logs
                    Log.Error(ex.Message);
                } finally
                {
                    //if sent successfully it logs it as well
                    Log.Info(string.Format("SUCCESS SEND MAIL TO {0}", email));
                }
            }
        }
    }
}
