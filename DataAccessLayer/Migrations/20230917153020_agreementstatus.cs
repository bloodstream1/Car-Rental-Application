using Microsoft.EntityFrameworkCore.Migrations;

namespace Car_Rental_Application.Migrations
{
    public partial class agreementstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agreements_Car_CarId",
                table: "Agreements");

            migrationBuilder.DropIndex(
                name: "IX_Agreements_CarId",
                table: "Agreements");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Agreements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Agreements");

            migrationBuilder.CreateIndex(
                name: "IX_Agreements_CarId",
                table: "Agreements",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Agreements_Car_CarId",
                table: "Agreements",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
