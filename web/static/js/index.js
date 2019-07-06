const steps = [
  { title: "OS Selection", content: "OS Selection Content" },
  { title: "Shell Selection", content: "OS Shell Selection Content" },
  { title: "Installation command", content: "Installation Command content" }
];

const osSelectionTemplate = obj => `
  <div>
    <h1>${obj.title}</h1>
    <div>${obj.content}</div>
  </div>
`;

const wizardNavigation = () => {
  let currentStep = 0;
  let api = {};

  api.currentStep = () => steps[currentStep];

  api.next = () => {
    currentStep++;
  };

  api.getNextStep = () => currentStep + 1;

  api.isLastStep = () => currentStep === steps.length - 1;

  api.isFirstStep = () => currentStep === 0;

  api.previous = () => {
    currentStep--;
  };
  return api;
};

const app = () => {
  let api;

  api.createStep = () => {
    document.querySelector("#wizard");
  };
};

const onNext = navigationService => () => {
  if (navigationService.isLastStep()) return;

  const wizardEl = document.querySelector("#wizard");
  const currentStepEl = wizardEl.firstElementChild;
  currentStepEl.remove();
  const rendered = Mustache.render(
    osSelectionTemplate(navigationService.currentStep())
  );
  $(wizardEl).html(rendered);
  navigationService.next();
};

const onPrevious = navigationService => () => {
  if (navigationService.isFirstStep()) return;

  const wizardEl = document.querySelector("#wizard");
  const currentStepEl = wizardEl.firstElementChild;
  currentStepEl.remove();
  const rendered = Mustache.render(
    osSelectionTemplate(navigationService.currentStep())
  );
  $(wizardEl).html(rendered);
  navigationService.previous();
};

window.onload = () => {
  const navigationService = wizardNavigation();
  document
    .querySelector("#next")
    .addEventListener("click", onNext(navigationService));
  document
    .querySelector("#previous")
    .addEventListener("click", onPrevious(navigationService));
};
