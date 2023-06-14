// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

// Test d'inscription
test('Inscription', async ({ page }) => {
  // Accéder à la page d'inscription
  await page.goto('https://app.sidapp.fr/sign-up');

  // Générer des informations aléatoires pour remplir le formulaire
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = 'Test1234567';
  const phone = '652201669';
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const zipCode = '92100';

  // Remplir le formulaire d'inscription
  await page.selectOption("select[name='student_status']", '0');
  await page.fill('input[name="first_name"]', firstName);
  await page.fill('input[name="last_name"]', lastName);
  await page.fill("input[name='email']", email);
  await page.fill("input[id='phone']", phone);
  await page.fill("input[name='password']", password);
  await page.fill("input[name='confirm_password']", password);
  await page.fill("input[name='address']", address);
  await page.fill("input[name='current_city']", city);
  await page.fill("input[name='zipcode']", zipCode);
  await page.selectOption("select[name='study']", 'Chirurgien-dentiste');
  await page.selectOption("select[name='current_year_of_study']", '3ème année');
  await page.selectOption("select[name='is_vehiculed']", 'true');
  await page.selectOption("select[name='city']", '1');
  await page.click("text=S'inscrire");

  // Attendre un délai de 5 secondes pour la confirmation de l'inscription
  await page.waitForTimeout(5000);
  const newPageText = await page.textContent('body');
  await expect(newPageText).toContain('Inscription réussie');
});

// Test de vérification de la connexion
test('Vérifier la connexion', async ({ page }) => {
  // Informations de connexion du pharmacien
  const pharma_name = '9898989';
  const pharma_password = '4vrBToeP';

  // Accéder à la page de connexion
  await page.goto('https://app.sidapp.fr/sign-in');

  // Remplir les informations de connexion
  await page.fill('#username', pharma_name);
  await page.fill('#password', pharma_password);
  await Promise.all([
    page.waitForNavigation(),
    page.click("button[type='submit']"),
  ]);

  // Vérifier que la connexion est réussie
  await page.waitForTimeout(5000);
  const newPageText = await page.textContent('body');
  await expect(newPageText).toContain('Profil');
});

// Test de vérification du formulaire Sidep
test('Vérifier le formulaire Sidep', async ({ page }) => {
  // Générer des informations aléatoires pour remplir le formulaire
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const phone = '652201669';
  const address = faker.location.streetAddress();
  const birthdateMask = '02/02/2000';
  const city = faker.location.city();
  const zipCode = '92100';
  let uuid = 'e3159e33-72ec-4313-b7ef-f4f15d481dbe';

  // Accéder à la page du formulaire Sidep avec l'UUID spécifié
  await page.goto(`http://app.sidapp.fr/sidep/${uuid}`);

  // Remplir le formulaire Sidep
  await page.fill('input[name="firstname"]', firstName);
  await page.fill('input[name="lastname"]', lastName);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="birthdate"]', birthdateMask);
  await page.selectOption('select[name="sexe"]', '1');
  await page.selectOption('select[name="is_medic"]', 'true');
  await page.fill('input[name="street"]', address);
  await page.fill('input[name="cp"]', zipCode);
  await page.fill('input[name="city"]', city);
  await page.selectOption('#country', 'FR');
  await page.fill('input[id="phone"]', phone);
  await page.selectOption('select[name="travel"]', 'true');
  await page.selectOption('select[name="have_traveled"]', 'true');
  await page.selectOption('select[name="accomodation"]', '1');
  await page.selectOption('select[name="symptoms"]', '2');
  await page.check('#checkYes');

  // Soumettre le formulaire
  await page.click("text=Envoyer");

  // Attendre un délai de 5 secondes pour la confirmation de l'envoi des informations
  await page.waitForTimeout(5000);
  const newPageText = await page.textContent('body');
  await expect(newPageText).toContain('Informations envoyées');
});

// Test de modification du compte
test('Modification du compte', async ({ page }) => {
  // Générer des informations aléatoires pour la modification du compte
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  // Informations de connexion du pharmacien
  const pharma_name = '9898989';
  const pharma_password = '4vrBToeP';

  // Accéder à la page de connexion
  await page.goto('https://app.sidapp.fr/sign-in');

  // Remplir les informations de connexion
  await page.fill('#username', pharma_name);
  await page.fill('#password', pharma_password);
  await Promise.all([
    page.waitForNavigation(),
    page.click("button[type='submit']"),
  ]);

  // Vérifier que la connexion est réussie
  await page.waitForTimeout(5000);
  const newPageText = await page.textContent('body');
  await expect(newPageText).toContain('Profil');

  // Modifier le compte avec de nouvelles informations
  await page.fill('input[name="firstname"]', firstName);
  await page.fill('input[name="lastname"]', lastName);

  // Enregistrer les modifications
  await page.click('button:has-text("Modifier")');

  // Attendre un délai de 5 secondes pour la confirmation de l'enregistrement des modifications
  await page.waitForTimeout(5000);
  const refreshPageText = await page.textContent('body');
  await expect(refreshPageText).toContain('Modifications enregistrées');
});

// Test de déconnexion
test('Déconnexion', async ({ page }) => {
  // Informations de connexion du pharmacien
  const pharma_name = '9898989';
  const pharma_password = '4vrBToeP';

  // Accéder à la page de connexion
  await page.goto('https://app.sidapp.fr/sign-in');

  // Remplir les informations de connexion
  await page.fill('#username', pharma_name);
  await page.fill('#password', pharma_password);
  await Promise.all([
    page.waitForNavigation(),
    page.click("button[type='submit']"),
  ]);

  // Vérifier que la connexion est réussie
  await page.waitForTimeout(5000);
  const newPageText = await page.textContent('body');
  await expect(newPageText).toContain('Profil');

  // Cliquer sur le bouton de déconnexion
  await page.click("text=Déconnexion");

  // Attendre un délai de 5 secondes pour la confirmation de la déconnexion
  await page.waitForTimeout(5000);
  await page.click("text=Se déconnecter");
  await page.waitForTimeout(5000);
  const disconnectPageText = await page.textContent('body');
  await expect(disconnectPageText).toContain('Connexion');
});
