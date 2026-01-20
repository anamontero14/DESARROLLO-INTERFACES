using SignalRChat2.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNative", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed((host) => true) // Permite cualquier origen (ideal para apps móviles)
              .AllowCredentials();               // Obligatorio para SignalR
    });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("AllowReactNative");

app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.Run();
