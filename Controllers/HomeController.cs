using System;
using System.Diagnostics;
using System.Formats.Tar;
using Microsoft.AspNetCore.Mvc;
using MindfulNotes.DTO;
using MindfulNotes.Models;
using Newtonsoft.Json;

namespace MindfulNotes.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Index()
        {
            if (string.IsNullOrEmpty(Request.Query["username"]))
            {
                return RedirectToAction("Login", "Home");
            }

            var username = Request.Query["username"];

            Entry entries = new Entry();

            string jsonString = JsonConvert.SerializeObject(entries, Formatting.Indented);

            var filePath = getFilePath(username, DateTime.Now.ToString("dd-M-yyyy"));

            if (!System.IO.File.Exists(filePath))
            {
                System.IO.File.WriteAllText(filePath, jsonString);
            }            

            return View();
        }

        public IActionResult ShowEntries()
        {
            if (!string.IsNullOrEmpty(Request.Query["username"]) && !string.IsNullOrEmpty(Request.Query["date"]))
            {
                var username = Request.Query["username"];
                var date = Request.Query["date"];

                var filePath = getFilePath(username, date);

                var entriesData = "";

                var entries = GetEntries(filePath);

                return View(entries);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public IActionResult AddEntry([FromBody] EntryDTO entryDTO)
        {
            Entry entry = new Entry()
            {
                Description = entryDTO.Description,
                EntryDate = DateTime.Now,
            };

            string jsonString = JsonConvert.SerializeObject(entry, Formatting.Indented);

            var filePath = getFilePath(entryDTO.Username, DateTime.Now.ToString("dd-M-yyyy"));


            if (System.IO.File.Exists(filePath))
            {
                var entries = GetEntries(filePath);

                entries.Add(entry);

                string updatedJson = JsonConvert.SerializeObject(entries, Formatting.Indented);

                System.IO.File.WriteAllText(filePath, updatedJson);
            }
            else
            {
                System.IO.File.WriteAllText(filePath, jsonString);
            }

            return Json(new { success = true });
        }

        private string getFilePath(string username, string date)
        {
            var localFilePath = Environment.CurrentDirectory;
            var fileName = username + "_" + date;
            var filePath = Path.Combine(localFilePath, "DataEntries", fileName);

            return filePath;
        }

        private List<Entry> GetEntries(string filePath)
        {
            var entriesData = "";

            if (System.IO.File.Exists(filePath))
            {
                entriesData = System.IO.File.ReadAllText(filePath);
            }

            if (entriesData != "")
            {
                List<Entry> entries = null;

                if (entriesData.TrimStart().StartsWith("["))
                {
                    entries = JsonConvert.DeserializeObject<List<Entry>>(entriesData);
                }
                else
                {
                    var singleEntry = JsonConvert.DeserializeObject<Entry>(entriesData);
                    entries = new List<Entry> { singleEntry };
                }

                return entries;
            }

            return null;
        }
    }
}
