export const buttonsDisableToggle=(buttonsElementArrey)=>{
    buttonsElementArrey.forEach((button) => {
        button.disabled = !button.disabled;
      });
}

