document.getElementById('submitBtn').addEventListener('click', async () => {
  const full_name = document.getElementById('full_name').value;
  const country = document.getElementById('country').value;
  const dob = document.getElementById('dob').value;
  const city = document.getElementById('city').value;

  document.getElementById('loadingOverlay').classList.add('show');

  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, country, dob, city })
  });

  const data = await response.json();
  const outputs = data.sas_response.outputs;

  const name = outputs.find(item => item.name === 'Output_Name')?.value || 'Unknown';
  const countryName = outputs.find(item => item.name === 'Output_Country_Name')?.value || 'Unknown';
  const age = outputs.find(item => item.name === 'Output_Age')?.value || 'Unknown';
  const score = parseFloat(outputs.find(item => item.name === 'Output_Score')?.value) || 0;
  const summary = outputs.find(item => item.name === 'Output_Summary')?.value || '';
  let source = outputs.find(item => item.name === 'Output_Source')?.value;
  if (!source) {
    source = 'No source available';
  }

  document.getElementById('outputName').innerText = name;
  document.getElementById('outputCountryName').innerText = countryName;
  document.getElementById('outputAge').innerText = age;
  document.getElementById('outputScore').innerText = `${score}`;
  document.getElementById('outputSummary').innerText = summary;
  document.getElementById('outputSource').innerText = source;

  const green = [168, 237, 234];
  const red = [254, 99, 99];
  const ratio = Math.min(Math.max(score / 10, 0), 1);
  const r = Math.round(green[0] + (red[0] - green[0]) * ratio);
  const g = Math.round(green[1] + (red[1] - green[1]) * ratio);
  const b = Math.round(green[2] + (red[2] - green[2]) * ratio);

  document.body.style.background = `linear-gradient(135deg, rgb(${r},${g},${b}) 0%, #ffffff 100%)`;

  document.getElementById('loadingOverlay').classList.remove('show');
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('outputContainer').classList.add('show');
});

document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('outputContainer').classList.remove('show');
  document.getElementById('formContainer').style.display = 'block';
  document.body.style.background = `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`;
});
