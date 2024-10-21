-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "label" TEXT NOT NULL DEFAULT 'to-do',
    "status" TEXT NOT NULL DEFAULT 'created',
    "iat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iby" TEXT NOT NULL,
    "ito" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ito_fkey" FOREIGN KEY ("ito") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
