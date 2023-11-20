using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheDuckMobile_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase20112203 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TemporaryCustomerId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TemporaryCustomers",
                columns: table => new
                {
                    TemporaryCustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemporaryCustomers", x => x.TemporaryCustomerId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_TemporaryCustomerId",
                table: "Orders",
                column: "TemporaryCustomerId",
                unique: true,
                filter: "[TemporaryCustomerId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_TemporaryCustomers_TemporaryCustomerId",
                table: "Orders",
                column: "TemporaryCustomerId",
                principalTable: "TemporaryCustomers",
                principalColumn: "TemporaryCustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_TemporaryCustomers_TemporaryCustomerId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "TemporaryCustomers");

            migrationBuilder.DropIndex(
                name: "IX_Orders_TemporaryCustomerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TemporaryCustomerId",
                table: "Orders");
        }
    }
}
